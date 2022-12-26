/**
 * WordPress dependencies
 */
import {useSelect} from "@wordpress/data";
import {useState, useEffect} from "@wordpress/element";
import {pickBy, isUndefined} from "lodash";

/**
 * Block dependencies
 */
import metadata from '../../block.json';
import Loader from "../loader/index.js";
import PostCard from "../post-card/index.js";
import Skeleton from "../skeleton/index.js";
import './index.scss';

const PostsList = ({args}) => {
    const [posts, setPosts] = useState(null);

    const {
        postType,
        perPage,
        order,
        orderBy,
        categories,
        status,
        offset,
        context
    } = args;

    const request = useSelect(select => {
        const {getEntityRecords, hasFinishedResolution, isResolving, hasEntityRecords} = select('core');
        const catIds = categories && 0 < categories.length ? categories.map((cat) => cat.id) : [];

        const args = [
            'postType',
            postType,
            pickBy({
                per_page: perPage,
                context: context
            }, (value) => !isUndefined(value))
        ];

        return {
            posts: getEntityRecords(...args),
            isResolvingPosts: isResolving('getEntityRecords', args),
            hasResolvedPosts: hasFinishedResolution('getEntityRecords', args),
        };
    }, [args]);

    useEffect(() => {
        if (!request.isResolvingPosts && request.hasResolvedPosts && request.posts?.length > 0) {
            setPosts(request.posts);
        }
    }, [request]);

    return (
        <>
            <h1>Posts List</h1>
            <div className="posts-wrapper">
                {request.isResolvingPosts &&
                    <Skeleton number={perPage}/>
                }
                {request.hasResolvedPosts && posts?.length > 0 &&
                    posts?.map((post, index) => {
                        return (
                            <PostCard post={post}/>
                        )
                    })
                }
                {request.hasResolvedPosts && posts?.length === 0 &&
                    <p>Nenhum post encontrado</p>
                }
                {request.hasResolvedPosts && !posts &&
                    <p>Erro ao carregar posts</p>
                }
            </div>
        </>
    )
}


export default PostsList;
