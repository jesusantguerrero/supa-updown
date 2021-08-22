<template>
  <div class="flex flex-col">
    <div class="w-full">
        <slot />
    </div>
    <div class="w-full mt-10 font-light">
      <h2>Email Sent</h2>
      <p class="mt-5">Please check your inbox for your sign-in link.</p>
      <p class="mt-5">
        Sometimes this can land in SPAM! While we hope that this won’t happen,
        please check if it doesn’t arrive in a minute or three. If you still
        can't login please email us at jesus@neatlancer.com and we will help you
        as soon as possible.
      </p>
    </div>
  </div>
</template>
