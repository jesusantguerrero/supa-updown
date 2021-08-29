![supaup](/frontend/src/assets/cover.png)

## Description

A demo project using Vite.js, Vue 3 and Supabase. Is a site status check you can self host your own

## Features
- [x] Add Multiple Sites

- [x] Public status pages

- [x] Run background site checks


Roadmap

- [x] Delete and edit pages and sites

- [x] Send notifications via email

- [ ] Prune accounts and sites daily in the demo version (for performance reasons in demo)

- [ ] Activate creation of status and pages (24 hours) in demo

- [ ] Allow subscriptions to incidents

## Demo
[supaup](https://supa-updown.web.app/status/1a8ac430-34b0-421d-8557-397babcd5c03)

## Prerequisites

| Prerequisite                                          | Version    |
| ------------------------------------------------------| ---------- |
| [Supabase Account](https://app.supabase.io/)          |    --      |
| [Node.js](http://nodejs.org)                          | `~ ^12.20` |
| npm (comes with Node) or yarn (used)                  | `~ ^6.14.8`|

## Deploy your own

### 1. Create a new project
Sign up to Supabase - https://app.supabase.io and create a new project.

### 2. Run "Status check" SQL
After the database has started, go to SQL editor and paste:

```sql
--
-- For use with
-- https://github.com/jesusantguerrero/supa-updown
--

-- Create a table for sites
create table sites (
  id uuid DEFAULT extensions.uuid_generate_v4() primary key,
  user_uid uuid references auth.users not null,
  contains varchar,
  http_request json,
  interval int2,
  apdex float4,
  protocol varchar default 'https://',
  last_response json,
  title varchar,
  url varchar,
  responses json,
  next_check_date timestamp default now() not null,
  listeners varchar[],
  status varchar default 'OPERATIONAL',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table sites enable row level security;

CREATE POLICY "Everyone can read sites" ON public.sites FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert sites" ON public.sites FOR INSERT WITH CHECK (auth.uid() = user_uid);
CREATE POLICY "Users can update their sites" ON public.sites FOR UPDATE USING (auth.uid() = user_uid);
CREATE POLICY "Users can delete their sites" ON public.sites FOR DELETE USING (auth.uid() = user_uid);


-- Create table pages
create table pages (
  id uuid DEFAULT extensions.uuid_generate_v4() primary key,
  user_uid uuid references auth.users not null,
  slug varchar unique check (char_length(slug) >= 3) not null,
  title varchar not null,
  description text,
  logo text
);

alter table pages enable row level security;

CREATE POLICY "Everyone can read pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert pages" ON public.pages FOR INSERT WITH CHECK (auth.uid() = user_uid);
CREATE POLICY "Users can update their pages" ON public.pages FOR UPDATE USING (auth.uid() = user_uid);
CREATE POLICY "Users can delete their pages" ON public.pages FOR DELETE USING (auth.uid() = user_uid);

-- create pages_sites to build a many to many relation
create table page_sites (
  id uuid DEFAULT extensions.uuid_generate_v4() primary key,
  user_uid uuid references auth.users not null,
  page_id uuid references pages not null,
  site_id uuid references sites not null,
  name varchar
);

alter table page_sites enable row level security;
CREATE POLICY "Everyone can read page_sites" ON public.page_sites FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert page_sites" ON public.page_sites FOR INSERT WITH CHECK (auth.uid() = user_uid);
CREATE POLICY "Users can update their page_sites" ON public.page_sites FOR UPDATE USING (auth.uid() = user_uid);
CREATE POLICY "Users can delete their page_sites" ON public.page_sites FOR DELETE USING (auth.uid() = user_uid);

-- create incidents to save updates and issues for our status pages
create table incidents (
  id uuid DEFAULT extensions.uuid_generate_v4() primary key,
  user_uid uuid references auth.users not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  page_id uuid references pages not null,
  incident_id uuid,
  title varchar,
  sites uuid[],
  description text,
  log json,
  notify_listeners boolean,
  status varchar check (status in ('investigating', 'update', 'resolved')) default 'investigating'
);

alter table incidents enable row level security;
CREATE POLICY "Everyone can read incidents" ON public.incidents FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert incidents" ON public.incidents FOR INSERT WITH CHECK (auth.uid() = user_uid);
CREATE POLICY "Users can update their incidents" ON public.incidents FOR UPDATE USING (auth.uid() = user_uid);
CREATE POLICY "Users can delete their incidents" ON public.incidents FOR DELETE USING (auth.uid() = user_uid);

-- create notifications to notify subscribers
create table notifications (
  id uuid DEFAULT extensions.uuid_generate_v4() primary key,
  user_uid uuid references auth.users not null,
  handlers varchar[],
  subject varchar,
  message varchar,
  data json,
  channel varchar default 'email',
  status varchar check (status in('scheduled', 'sent', 'failed')) default 'scheduled'
);

alter table notifications enable row level security;
CREATE POLICY "Users can see notifications generated in their pages" ON public.notifications FOR SELECT USING (auth.uid() = user_uid);
CREATE POLICY "Notifications are generated by the system" ON public.notifications FOR INSERT WITH CHECK (false);
CREATE POLICY "Notifications are updated by system" ON public.notifications FOR UPDATE USING (false);
CREATE POLICY "Users can delete notifications generated in their pages" ON public.notifications FOR DELETE USING (auth.uid() = user_uid);

-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profiles;

-- Set up Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

create policy "Anyone can update an avatar."
  on storage.objects for update
  with check ( bucket_id = 'avatars' );

```

### 3. Get the URL and Key

Go to the Project Settings (the cog icon), open the API tab, and find your API URL and `anon` key, you'll need these in the next step.

The `anon` key is your client-side API key. It allows "anonymous access" to your database, until the user has logged in. Once they have logged in, the keys will switch to the user's own login token. This enables row level security for your data. Read more about this [below](#postgres-row-level-security).

![image](https://user-images.githubusercontent.com/10214025/88916245-528c2680-d298-11ea-8a71-708f93e1ce4f.png)

**_NOTE_**: The `service_role` key has full access to your data, bypassing any security policies. These keys have to be kept secret and are meant to be used in server environments and never on a client or browser.

### 4 deploy 

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jesusantguerrero/supa-updown)

Clicking this button will clone the repo to your GitHub account and instantly deploy to Netlify. You will need to have the [Netlify CLI](https://cli.netlify.com/) installed, and a `.env.local` file in  `frontend/` with the following:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=
```

### 5 
## Run Locally

```shell
node -v
```

### Cloning the repo

```bash
  git clone https://github.com/jesusantguerrero/supa-updown.git
```

Go to the project directory

```bash
  cd supa-updown
```

Install dependencies

```bash
  npm setup
```

Start the server

```bash
  npm run dev
```

Running background site-checks

```bash
  npm run background
```

