<!-- .vuepress/components/BlogHero.vue -->
<script setup lang="ts">
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import BlogHero from "vuepress-theme-hope/blog/components/BlogHero.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <BlogHero>
    <template #heroBg>
      <BingHeroBackground />
    </template>
    <template #heroInfo="heroInfo">
      <HitokotoBlogHero v-bind="heroInfo" />
    </template>
  </BlogHero>
</template>

<style lang="scss" scoped>
// 一言
#hitokoto {
  margin: 1.2rem auto 0;
  font-weight: 600;
  color: #fffffff2;
  opacity: 1;
  font-size: 1.5rem;
  display: block;
  .word {
    position: relative;
    padding: 1rem 2.5rem;
    text-align: center;
    .left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .right {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    #hitokoto_text {
      max-width: 80vw;
      position: relative;
      display: inline-block;
      font-family: PRshouxie, Georgia, "Times New Roman", Times, serif,
        sans-serif;
      font-size: 2.8rem;
      font-weight: 550;
      @media (max-width: hope-config.$tablet) {
        font-size: 2rem;
        font-weight: 550;
      }
    }
    #hitokoto_text:after {
      content: "|";
      font-size: 2rem;
      font-family: var(--font-family-fancy);
      animation: san 0.8s infinite;
    }
  }
  .author {
    font-weight: 500;
    margin-top: 1rem;
    float: right;
  }
}
#hitokoto_author {
  transform: translateY(-20px);
  transition: transform 0.3s ease-in-out 0.25s, opacity 1.2s ease-in-out 0.25s;
  font-family: Georgia, "Times New Roman", Times, serif, sans-serif;
  font-style: italic;
  font-size: 1.25rem;
  @media (max-width: hope-config.$mobile) {
    font-size: 1rem;
  }
}

@keyframes san {
  0%,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
#BingSwitchWrapper {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
  z-index: 5;
  display: flex;
  align-items: center;
  a {
    color: var(--theme-color);
    font-weight: 500;
    text-decoration: none;
    overflow-wrap: break-word;
  }
  #bingLink {
    display: flex;
    align-items: center;
    background-color: #2226;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  .bingLink-icon {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    .mapPin {
      fill: #fff;
      transform: translate3d(-50%, -50%, 0);
      top: 50%;
      left: 50%;
      position: absolute;
    }
    @media (max-width: hope-config.$mobile) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  #bingLink-text {
    font-family: "Segoe UI", Segoe, Tahoma, Arial, Verdana, sans-serif;
    text-align: left;
    box-sizing: border-box;
    min-height: 2.5rem;
    max-width: 14rem;
    color: #fff;
    padding: 0.625rem 0.625rem 0.625rem 0rem;
    font-size: 0.9rem;
    @media (max-width: hope-config.$mobile) {
      font-size: 0.75rem;
      min-height: 2rem;
    }
  }
  #left {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #222c;
    cursor: pointer;
    border-radius: 0.375rem;
    position: relative;
    margin-left: 0.25rem;
    @media (max-width: hope-config.$mobile) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
  #left::after {
    transform: scale(0.25) translate(25%) rotate(45deg);
    border-radius: 0.375rem;
    border-left: 0.375rem solid rgba(255, 255, 255, 0.8);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    content: "";
    position: absolute;
  }
  #left.disabled::after {
    border-left: 0.375rem solid rgba(255, 255, 255, 0.4);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.4);
  }
  #right {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #222c;
    cursor: pointer;
    border-radius: 0.375rem;
    position: relative;
    margin-left: 0.25rem;
    @media (max-width: hope-config.$mobile) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
  #right::after {
    transform: scale(0.25) translate(-25%) rotate(225deg);
    border-radius: 0.375rem;
    border-left: 0.375rem solid rgba(255, 255, 255, 0.8);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    content: "";
    position: absolute;
  }
  #right.disabled::after {
    border-left: 0.375rem solid rgba(255, 255, 255, 0.4);
    border-bottom: 0.375rem solid rgba(255, 255, 255, 0.4);
  }
}
</style>
