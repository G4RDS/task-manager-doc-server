import { HocuspocusProvider } from '@hocuspocus/provider';
import Collaboration from '@tiptap/extension-collaboration';
import Placeholder from '@tiptap/extension-placeholder';
import { ReactNodeViewRenderer } from '@tiptap/react';
import {
  TaskCard,
  noteContentBaseExtensions,
  noteTitleBaseExtensions,
} from 'tiptap-shared';
import { TaskCardNodeView } from '../components/tiptap/TaskCardNodeView';

export const createNoteTitleDocConnection = (noteId: string) => {
  const provider = new HocuspocusProvider({
    url: 'ws://localhost:8008',
    name: `note/${noteId}/title`,
  });

  const extensions = [
    ...noteTitleBaseExtensions,
    Placeholder.configure({
      placeholder: '無題',
      showOnlyCurrent: false,
    }),
    Collaboration.configure({
      document: provider.document,
    }),
  ];

  return {
    provider,
    extensions,
  } as const;
};

export const createNoteContentDocConnection = (noteId: string) => {
  const provider = new HocuspocusProvider({
    url: 'ws://localhost:8008',
    name: `note/${noteId}/content`,
  });

  const extensions = [
    ...noteContentBaseExtensions,
    Collaboration.configure({
      document: provider.document,
    }),
    TaskCard.extend({
      addNodeView() {
        return ReactNodeViewRenderer(TaskCardNodeView);
      },
    }),
  ];

  return {
    provider,
    extensions,
  } as const;
};
