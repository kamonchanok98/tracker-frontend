<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const router = useRouter();
const { setUser } = useAuth();

onMounted(async () => {
  const code = route.query.code as string;

  if (!code) {
    router.push('/');
    return;
  }

  try {
    const res = await fetch('/api/accounts/auth/line/callback/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (res.ok) {
      // Updates reactive state & localStorage simultaneously
      setUser(
        {
          displayName: data.line_display_name || data.username,
          pictureUrl: data.line_picture_url || '',
        },
        data.access,
        data.refresh
      );

      router.push('/');
    } else {
      console.error('LINE callback failed:', data);
      router.push('/');
    }
  } catch (err) {
    console.error('Error handling LINE callback:', err);
    router.push('/');
  }
});
</script>

<template>
  <div class="callback-loading">
    <p>Authenticating with LINE...</p>
  </div>
</template>
