import { IProject } from '@pages/projects/[project_id]';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import axios from 'axios';

// Initialize a context for the server
function createContext() {
  return {};
}

// Get the context type
type Context = inferAsyncReturnType<typeof createContext>;

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Create a router
export const projectsRouter = t.router({
  // List projects procedure
  list: t.procedure.query(async () => {
    const res = await axios.get(`${process.env.API_URL}/projects/`);
    const projects = res.data.filter((project: IProject) => project.name.toLowerCase().startsWith('cardano-'));
    return projects;
  }),
});