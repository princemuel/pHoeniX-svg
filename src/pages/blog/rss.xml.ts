import { delimiter } from "@/lib/config";
import { fetchResource } from "@/lib/utils";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const resource = await fetchResource("posts");
  const author = "Prince Muel";

  const base = new URL("/", context.site).toString();

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
    },
    title: `${author} ${delimiter} Blog RSS Feed`,
    description:
      "My Personal Website scaffolded with Astro. If you subscribe to this RSS feed, you will receive updates and summaries of my new posts",
    site: new URL("/", context.site),
    items: (resource ?? []).map((item) => {
      return {
        title: item.data.title,
        description: item.data.description,
        link: `/blog/${item.slug}/`,
        pubDate: item.data.publishedAt,
        categories: item.data.tags,
        commentsUrl: "https://github.com/princemuel/webapp/discussions",
        customData: `<media:content
        type="image/${item.data.media?.cover?.format == "jpg" ? "jpeg" : "png"}"
        width="${item.data.media?.cover?.width}"
        height="${item.data.media?.cover?.height}"
        medium="image"
        url="${base}${item.data.media?.cover?.src || ""}" />
    `,
      };
    }),
    customData: `<atom:link href="${base}rss.xml" rel='self'
    type='application/rss+xml' xmlns:atom='http://www.w3.org/2005/Atom'
    xmlns:content='http://purl.org/rss/1.0/modules/content/'></atom:link>
    <language>en-US</language>
    `,
    stylesheet: "/styles.xsl",
  });
};
