/**
 * WordPress dependencies
 */
import {useSelect} from "@wordpress/data";
import {useState, useEffect} from "@wordpress/element";
import {pickBy, isUndefined} from "lodash";
import {useEntityRecords} from "@wordpress/core-data";

/**
 * Block dependencies
 */
import metadata from '../../block.json';
import Loader from "../loader/index.js";
import PostCard from "../post-card/index.js";
import Skeleton from "../skeleton/index.js";
import './index.scss';

const PostsList = (props) => {
    const [posts, setPosts] = useState(null);
    const [post, setPost] = useState(null);
    const { records, isResolving } = useEntityRecords( 'postType', 'post' );

    const {
        args,
        layout,
        card
    } = props;

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

    const {
        layoutType,
        gridConfigs,
        listConfigs,
        carouselConfigs,
        masonryConfigs
    } = layout;

    const request = useSelect(select => {
        const {getEntityRecords, hasFinishedResolution, isResolving, getEntityConfig} = select('core');
        const catIds = categories && 0 < categories.length ? categories.map((cat) => cat.id) : [];

        const args = [
            'postType',
            postType,
            pickBy({
                categories: catIds,
                order: order,
                orderby: orderBy,
                per_page: perPage,
                offset: offset,
                status: status,
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
                            <PostCard post={post} setPost={setPost}/>
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
