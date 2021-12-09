import PostType from '@/interfaces/PostType';
import moment from 'moment-mini';
import { Submission } from 'snoowrap';

export function isImgUrl(url: string): boolean {
    return /\.(jpeg|jpg|gif|png)$/.exec(url.toLowerCase()) !== null;
}

export function splitUrl(url: string): string[] {
    const newUrl = url.replace(/^https?:\/\/(www\.)?/, '');
    const [domain, ...rest] = newUrl.split('/');
    return [domain, `/${rest.join('/')}`];
}

export const PostDisruction = (post: Submission): PostType => {
    const isHidden = post.spoiler || post.over_18;

    const newPost: PostType = {
        authorName: post.author.name,
        commentsCount: post.num_comments,
        created: moment.unix(post.created_utc).fromNow(),
        isHidden,
        linkFlaitText: post.link_flair_text,
        score: post.score,
        url: post.url,
        id: post.id,
        originalPost: post,
        subredditName_prefix: post.subreddit_name_prefixed,
        subredditName_display: post.subreddit.display_name,
        title: post.title,
    };

    //   self-text

    if (post.is_self) {
        newPost.content = { type: 'Self' };
        if (!post.selftext_html) {
            newPost.selfTextHtml = '';
        }

        if (isHidden) {
            newPost.selfTextHtml = 'Hidden text';
        }

        newPost.selfTextHtml = post.selftext_html;
    }

    //   image

    if (isImgUrl(post.url) || post.domain === 'imgur.com') {
        newPost.content = { type: 'Image', url: post.url };

        if (post.domain === 'imgur.com') {
            newPost.content.url = `${post.url}.jpg`;
        }

        if (post.preview) {
            newPost.content_size = {
                width: post.preview.images[0].source.width,
                height: post.preview.images[0].source.height,
            };
        }
    }

    //imgur gifv

    if (post.domain === 'i.imgur.com' && post.url.indexOf('gifv') !== 0) {
        newPost.content = { type: 'GifV', url: post.url.replace('.gifv', '.mp4') };

        const redditVideoPreview = (post.preview as any).reddit_video_preview;

        if (redditVideoPreview) {
            newPost.imgPreview_Size = {
                width: redditVideoPreview.width,
                height: redditVideoPreview.height,
            };
        } else {
            newPost.imgPreview_Size = {
                width: post.preview.images[0].source.width,
                height: post.preview.images[0].source.height,
            };
        }
    }

    // v.redd.it videos

    if (post.is_video) {
        const { media } = post;

        newPost.content = { type: 'Video', url: media.reddit_video.fallback_url };

        newPost.content_size = {
            width: (media.reddit_video as any).width,
            height: media.reddit_video.height,
        };

        if (post.media.reddit_video.is_gif) {
            newPost.content.type = 'Gif';
        }
    }

    // Gfycat

    if (post.domain === 'gfycat.com') {
        newPost.content.type = 'Gif';
        if (post.url.includes('ifr')) {
            newPost.content.url = post.media.reddit_video.fallback_url;
        } else {
            const rest = splitUrl(post.url)[1];
            newPost.content.url = `https://gfycat.com/ifr${rest}`;
        }
    }

    // rich video (e.g. YouTube)

    if (post.post_hint === 'rich:video' && post.media) {
        newPost.content = {
            type: 'RichVideo',
            url: post.media.oembed.html,
        };
    }

    // Where is gallery_data in types??? wtf.
    interface PostWithGalleryData extends Submission {
        gallery_data: any[];
        tournament_data: any;
    }

    if (
        post.post_hint === 'link' ||
        (post as PostWithGalleryData).gallery_data ||
        (post as PostWithGalleryData).tournament_data
    ) {
        newPost.content = {
            type: 'justLink',
            url: post.url,
        };
    }

    return newPost;
};

export {};
