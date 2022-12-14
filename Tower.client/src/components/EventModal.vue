<template>
    <div class="modal fade" id="event-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content text-body">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create Event</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot name="modal-body-slot"></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
  
  
  
  setup() {
  
    return {};
  
  }
  }
  </script>
  
  <style>
  
  </style>