/**
 * WordPress dependencies
 */
import {useSelect} from "@wordpress/data";

/**
 * Block dependencies
 */
import metadata from '../block.json';
import Loader from "./loader/loader";
import PostCard from "./post-card";

const blockClass = `.wp-block-${metadata.name.replace('/', '-')}`;

const PostsList = ({perPage}) => {

    // const {posts} = wp.data.useSelect;

    const {
        posts,
        isResolvingPosts,
        hasResolvedPosts
    } = useSelect(select => {
        const {getEntityRecords, hasFinishedResolution, isResolving} = select('core');

        const args = [
            'postType',
            'post',
            {per_page: -1, status: ['publish', 'draft']},
        ];

        return {
            posts: getEntityRecords(...args),
            isResolvingPosts: isResolving('getEntityRecords', args),
            hasResolvedPosts: hasFinishedResolution(
                'getEntityRecords',
                args
            ),
        };
    }, []);

    return (
        <div>
            <h1>Posts List</h1>
            {isResolvingPosts &&
                <Loader/>
            }
            {hasResolvedPosts &&
                <div className="posts-list">
                    {posts?.map((post, index) => {
                        return (
                            <PostCard post={post}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}


export default PostsList;
