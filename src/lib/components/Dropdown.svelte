<script>
  import { onClickOutside } from "../../utils/onClickOutside";


  export let options = []; // List of options (e.g., gender, languages)
  export let selected = ''; // Single selected item or array for multi-select
  export let placeholder = 'Select an option'; // Placeholder text
  export let multiSelect = false; // Enable multi-selection
  export let onChange; // Function to handle selection changes
  export let type; // "languages|gender|specialization"

  let isOpen = false;
  let activeDropdown = null;

  const toggleDropdown = (name) => {
    activeDropdown = activeDropdown === name ? null : name;
  };

  function selectOption(option) {
    if (multiSelect) {
      let updatedSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      onChange(updatedSelection, type);
    } else {
      onChange(option, type);
      isOpen = false;
    }
  }
</script>

<div class="relative w-full">
  <button
  id={`${type}-dropdown-button`}
    class="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-md flex justify-between items-center"
    on:click={() => toggleDropdown(type)}
  >
    {#if !selected || (multiSelect && selected.length === 0)}
      <span class="text-gray-400">{placeholder}</span>
    {:else}
      <span>{multiSelect ? selected.join(', ') : selected}</span>
    {/if}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-gray-600"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  {#if activeDropdown === type}
    <div
      class="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
      use:onClickOutside={{
        callback: () => (activeDropdown = null),
        excludeSelector: `#${type}-dropdown-button`,
      }}
    >
      {#each options as option}
        <label
          class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {#if multiSelect}
            <input
              type="checkbox"
              class="mr-2"
              on:click={() => selectOption(option)}
              checked={selected.includes(option)}
            />
          {/if}
          <span>{option.replace('_', ' ')}</span>
        </label>
      {/each}
    </div>
  {/if}
</div>
