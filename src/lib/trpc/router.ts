import { albums } from './routes/albums';
import { photos } from './routes/photos';
import { users } from './routes/users';
import { t } from './t';

export const router = t.router({
	users,
	albums,
	photos,
});

export type Router = typeof router;
