import { IProject } from '@pages/projects/[project_id]';
import { initTRPC } from '@trpc/server';
import axios from 'axios';

// Initialize tRPC
const t = initTRPC.create();

// Create a router
export const projectsRouter = t.router({
  queries: {
    list: {
      resolve: async () => {
        const res = await axios.get(`${process.env.API_URL}/projects/`);
        const projects = res.data.filter((project: IProject) => project.name.toLowerCase().startsWith('cardano-'));
        return projects;
      },
    },
  },
});