<template>
  <nav>
    <menu class="flex flex-col lg:flex-row gap-5 lg:gap-[60px] items-center list-none">
      <li
        v-for="name in menuItems"
        :key="name"
      >
        <a
          href="#"
          class="text-xl leading-5 text-gray w-fit block hover:text-burgundy"
        >{{ name }}</a>
      </li>
    </menu>
  </nav>
</template>

<script setup lang="ts">
const menuItems = ['Solutions', 'Products', 'Pricing', 'Contact', 'Our Company']
</script>