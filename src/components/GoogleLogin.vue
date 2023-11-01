<script setup>
import {
  GoogleSignInButton
} from "vue3-google-signin";

// handle success event
const handleLoginSuccess = (response) => {
  const { credential } = response;
  console.log(response)
  console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>

<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</template>