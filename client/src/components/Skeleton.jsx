import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="product-items"
        speed={2}
        width={320}
        height={458}
        viewBox="0 0 320 458"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="1" y="0" rx="0" ry="0" width="280" height="240" />
        <rect x="0" y="262" rx="0" ry="0" width="280" height="30" />
        <rect x="0" y="306" rx="0" ry="0" width="280" height="60" />
        <rect x="2" y="383" rx="0" ry="0" width="80" height="45" />
        <rect x="131" y="378" rx="0" ry="0" width="151" height="55" />
    </ContentLoader>
)

export default Skeleton;