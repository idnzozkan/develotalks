<script>
export default {
  name: 'Topbar'
}
</script>

<template lang="pug">
  .topbar
    .topbar-inner-container
      .topbar-search
        font-awesome-icon(icon="search")
        input.search-box(type="search" placeholder="Search for rooms")
      .topbar-profile
        font-awesome-icon(:icon="['far', 'bell']")
        .user-avatar-frame
          img(src="https://i.ibb.co/PwQ7Dxv/profile.jpg")
</template>

<style lang="scss" scoped>
.topbar {
  width: 100%;
  /* height: 5.9375rem; */
  border-bottom: 1px solid #2C353D;
  padding: 1.9rem 8rem;

  .topbar-inner-container {
    display: flex;
    justify-content: space-between;

    .topbar-search {
      display: flex;
      align-items: center;
      width: 100%;
      height: auto;

      .search-box {
        border: none;
        outline: none;
        min-width: 75%;
        border-radius: 1.25rem;
        padding: 0.65rem 1.12500rem 0.65rem 2.9rem;
        background: #2C353D;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.1875rem;
        color: #6B7277;

        &::placeholder {
          color: #6B7277;
          opacity: 1;
        }

        &:-ms-input-placeholder {
          color: #6B7277;
        }

        &::-ms-input-placeholder {
          color: #6B7277;
        }

        &::-webkit-search-cancel-button {
          -webkit-appearance: none;
          height: 1em;
          width: 1em;
          border-radius: 50em;
          background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%;
          background-size: contain;
          opacity: 0;
          pointer-events: none;
          filter: invert(1);
        }

        &:focus::-webkit-search-cancel-button {
          opacity: .15;
          pointer-events: all;

          &:hover {
            cursor: pointer;
          }
        }
      }

      svg {
        position: absolute;
        margin-left: 1.12500rem;
        font-size: 1.12500rem;
        color: #6B7277;
      }
    }

    .topbar-profile {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: auto;
      padding-right: 1rem;

      svg {
        font-size: 1.5625rem;
        color: #6B7277;
        margin-right: 3rem;

        &:hover {
          cursor: pointer;
        }
      }

      .user-avatar-frame {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
        &:hover {
          cursor: pointer;
        }

        img {
          width: 100%;
        }
      }
    }
  }
}

</style>
