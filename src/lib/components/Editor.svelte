<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Editor } from '@tiptap/core';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import CharacterCount from '@tiptap/extension-character-count';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import Image from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';
	import Placeholder from '@tiptap/extension-placeholder';
	import Table from '@tiptap/extension-table';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import TableRow from '@tiptap/extension-table-row';
	import Typography from '@tiptap/extension-typography';
	import Underline from '@tiptap/extension-underline';
	import StarterKit from '@tiptap/starter-kit';
	import { lowlight } from 'lowlight/lib/core';
	import { onMount } from 'svelte';

	let element: HTMLDivElement;
	let editor: Editor | undefined;

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Underline,
				BubbleMenu,
				CharacterCount,
				CodeBlockLowlight.configure({ lowlight }),
				Image,
				Link,
				Placeholder,
				Table,
				TableHeader,
				TableRow,
				TableCell,
				Typography
			],
			onTransaction: () => {
				editor = editor;
			},
			content: '<h1>Hello</h1>'
		});
	});
</script>

{#if editor}
	<div class="toolbar">
		<button
			class:active={editor.isActive('bold')}
			on:click={() => editor?.chain().focus().toggleBold().run()}
			type="button"
		>
			<Icon icon="material-symbols:format-bold" />
		</button>
		<button
			class:active={editor.isActive('italic')}
			on:click={() => editor?.chain().focus().toggleItalic().run()}
			type="button"
		>
			<Icon icon="material-symbols:format-italic" />
		</button>
		<button
			class:active={editor.isActive('underline')}
			on:click={() => editor?.chain().focus().toggleUnderline().run()}
			type="button"
		>
			<Icon icon="material-symbols:format-underlined" />
		</button>
	</div>
{/if}
<div class="editor" bind:this={element} />

<style>
	.toolbar {
		display: grid;
		padding: var(--space-2) 0;
		border-radius: 4px 4px 0 0;
		background: linear-gradient(to bottom right, #ddd, #bbb);
		grid-auto-flow: column;
		place-content: start;
	}

	button {
		display: inline-grid;
		width: var(--space-12);
		padding: var(--space-2) var(--space-1);
		border: none;
		background-color: transparent;
		cursor: pointer;
		font-size: var(--text-sm);
		place-content: center;
	}

	button + button {
		border-left: 1px solid #aaa;
	}

	button.active {
		background-color: black;
		color: white;
	}

	:global(.ProseMirror) {
		padding: var(--space-4);
		border-radius: 0 0 8px 8px;
		background-color: #fff;
		color: #000;
	}
</style>
