import { RefObject } from "react"
import { useIntersectionObserver } from "usehooks-ts"

const useInfinite = (refLastElement: RefObject<Element>, onVisible: () => void, options: IntersectionObserverInit = {}) => {

    const entry = useIntersectionObserver(refLastElement, options)

    entry?.isIntersecting && onVisible()

}

export default useInfinite