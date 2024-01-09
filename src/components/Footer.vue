<template>
    <div class="mt-5 text-center">
        <p>&copy; {{ currentYear }} ARTFUNDI. Crafted by Taylor Lokombe</p>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return {
                currentYear: new Date().getFullYear(),
            }
        }
    }   
</script>