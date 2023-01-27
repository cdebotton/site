import sanityClient from '@sanity/client';
import { makeSafeQueryRunner } from 'groqd';

import { SANITY_DATASET, SANITY_ID, SANITY_TOKEN } from '$env/static/private';

const client = sanityClient({
	projectId: SANITY_ID,
	dataset: SANITY_DATASET,
	apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
	token: SANITY_TOKEN, // or leave blank for unauthenticated usage
	useCdn: true // `false` if you want to ensure fresh data
});

export const runQuery = makeSafeQueryRunner((query) => client.fetch(query));
