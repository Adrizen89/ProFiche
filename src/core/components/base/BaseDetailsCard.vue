<script setup>
defineProps({
  details: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <details
      v-for="(item, index) in details"
      :key="`${item.type}-${index}`"
      class="group p-2 text-ctex rounded-lg border border-primary"
      open
    >
      <summary class="flex items-center justify-between cursor-pointer list-none">
        <span class="font-semibold text-sm capitalize">
          {{ item.type.replace(/_/g, ' ') }} {{ index + 1 }}
        </span>
        <svg
          class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>

      <table class="border border-primary mt-2 text-xs w-full border-collapse">
        <tbody>
          <tr v-if="item.material" class="border-b border-primary">
            <th>Matériau</th>
            <td class="border-r border-primary p-2">{{ item.material }}</td>

            <th>Couleur</th>
            <td class="border-r border-primary">{{ item.color || '-' }}</td>

            <th>Type de fenêtre</th>
            <td class="border-r border-primary">{{ item.windowType || '-' }}</td>
          </tr>

          <tr v-if="item.room || item.installationType" class="border-b border-primary">
            <th>Pièce</th>
            <td class="border-r border-primary p-2">{{ item.room || '-' }}</td>

            <th>Type de pose</th>
            <td class="border-r border-primary">{{ item.installationType || '-' }}</td>
          </tr>

          <tr class="border-b border-primary">
            <th>Grille de ventilation</th>
            <td class="border-r border-primary p-2">{{ item.ventilation || '-' }}</td>

            <th>Habillage intérieur</th>
            <td class="border-r border-primary">{{ item.intTrim || '-' }}</td>

            <th>Habillage extérieur</th>
            <td class="border-r border-primary">{{ item.extTrim || '-' }}</td>
          </tr>

          <tr class="border-b border-primary">
            <th>Hauteur</th>
            <td class="border-r border-primary p-2">{{ item.height || '-' }}</td>

            <th>Largeur</th>
            <td class="border-r border-primary">{{ item.width || '-' }}</td>

            <th>Profondeur</th>
            <td class="border-r border-primary">{{ item.depth || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </details>
  </div>
</template>
