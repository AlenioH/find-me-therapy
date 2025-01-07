<script>
  import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
  <header class="bg-yellow-500 text-white py-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center px-4">
      <h1 class="text-2xl font-bold">FindMeTherapy</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/" class="hover:underline">Home</a></li>
          <li><a href="#" class="hover:underline">About</a></li>
          <li><a href="#" class="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="flex-grow">
    <slot />
  </main>

  <footer class="bg-yellow-500 text-white text-center py-4">
    <p>&copy; 2025 FindMeTherapy. All rights reserved.</p>
  </footer>
</div>
