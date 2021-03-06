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

export const PostDestruction = (post: Submission, authorName: string): PostType => {
    const isHidden = post.spoiler || post.over_18;

    const newPost: PostType = {
        authorName: authorName,
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
            newPost.content.url = '';
        }

        if (isHidden) {
            newPost.content.url = 'Hidden text';
        }

        newPost.content.url = post.selftext_html;
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
        newPost.content = { type: 'Image', url: post.url.replace('.gifv', '.mp4') };

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

        newPost.content = { type: 'Video', url: media.reddit_video.hls_url };

        newPost.content_size = {
            width: (media.reddit_video as any).width,
            height: media.reddit_video.height,
        };

        if (post.media.reddit_video.is_gif) {
            newPost.content.isGif = true;
            // const rest = splitUrl(post.url)[1];
            // newPost.content.url = `https://gfycat.com/ifr${rest}`;
        }
    }

    // Gfycat

    if (post.domain === 'gfycat.com') {
        const { media } = post;
        newPost.content = { type: 'Gif' };
        newPost.content_size = {
            width: media.oembed.width,
            height: media.oembed.height,
        };
        if (post.url.includes('ifr')) {
            newPost.content.url = post.media.reddit_video.fallback_url;
        } else {
            const rest = splitUrl(post.url)[1];
            newPost.content.url = `https://gfycat.com/ifr${rest}`;
        }
    }

    // rich video (e.g. YouTube)

    if (post.post_hint === 'rich:video' && post.domain !== 'gfycat.com') {
        newPost.content = {
            type: 'RichVideo',
            url: post.media.oembed.html,
        };
        newPost.content_size = { width: post.media_embed.width, height: post.media_embed.height };
    }

    // Where is gallery_data in types??? wtf.
    interface PostWithGalleryData extends Submission {
        gallery_data: any[];
        tournament_data: any;
    }

    if (
        post.post_hint === 'link' ||
        (post as PostWithGalleryData).gallery_data ||
        (post as PostWithGalleryData).tournament_data ||
        (!post.domain.startsWith('self') &&
            !post.domain.startsWith('v.redd') &&
            !post.domain.startsWith('i.redd') &&
            !post.domain.startsWith('youtu.be'))
    ) {
        newPost.content = {
            type: 'justLink',
            url: post.url,
        };
    }

    return newPost;
};

export {};
