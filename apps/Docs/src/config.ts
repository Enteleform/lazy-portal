export const SITE = {
	title: "Your Documentation Website",
	description: "Your website description.",
	defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
	image: {
		src: "https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true",
		alt:
			"astro logo on a starry expanse of space," +
			" with a purple saturn-like planet floating in the right foreground",
	},
	twitter: "astrodotbuild",
};

export const KNOWN_LANGUAGES = {
	English: "en",
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
// export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/blob/main/docs/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: "XXXXXXXXXX",
//   appId: "XXXXXXXXXX",
//   apiKey: "XXXXXXXXXX",
// }


export const SIDEBAR = [

	{text:"Installation", header:true},
		{text:"Standalone",          link:"Installation/Standalone"},
		{text:"In An Astro Project", link:"Installation/Astro"     },

	{text:"Examples", header:true},
		{text:"Test",   link:"Examples/Test"  },
		{text:"Portal", link:"Examples/Portal"},
]
