import {
  computed,
  type HTMLAttributes,
  nextTick,
  onMounted,
  onUnmounted,
  type Ref,
  type ReservedProps,
  shallowRef,
  type ShallowRef,
} from "vue"

const DEFAULT_OVERSCAN = 3
const DEFAULT_SCROLLING_DELAY = 150

interface IPropsVirtualList<T> {
  list: Ref<readonly T[]>
  listItemHeight: number
  templateRef: Readonly<ShallowRef<HTMLDivElement | null>>
  overscan?: number
  scrollingDelay?: number
}

export const useExample = <T = unknown>(props: IPropsVirtualList<T>) => {
  const {
    list,
    listItemHeight,
    templateRef,
    overscan = DEFAULT_OVERSCAN,
    scrollingDelay = DEFAULT_SCROLLING_DELAY,
  } = props

  // Обработка скрола
  const isScrolling = shallowRef(false)
  const timeoutId = shallowRef<number | null>(null)
  const setIsScrolling = () => {
    isScrolling.value = true
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    timeoutId.value = setTimeout(() => (isScrolling.value = false), scrollingDelay)
  }

  const scrollTop = shallowRef(0)
  const setScrollTop = () => {
    scrollTop.value = templateRef.value?.scrollTop as number
  }
  const handleScroll = () => {
    setIsScrolling()
    setScrollTop()
  }

  onMounted(() => {
    if (!templateRef.value) {
      return
    }
    setScrollTop()
    templateRef.value?.addEventListener("scroll", handleScroll)
  })

  // Реагирование на изменения размера контейнера
  const listHeight = shallowRef(0)
  const setListHeight = (value: number) => {
    listHeight.value = value
  }
  const resizeObserver = shallowRef<ResizeObserver | null>(null)
  const setResizeObserver = () => {
    if (!templateRef.value) {
      return
    }
    resizeObserver.value = new ResizeObserver(([entry]) => {
      const height =
        entry.borderBoxSize[0]?.blockSize ?? entry.target.getBoundingClientRect().height

      setListHeight(height)
    })
    resizeObserver.value.observe(templateRef.value)
  }
  onMounted(() => {
    nextTick(() => {
      setResizeObserver()
    })
  })

  // Интервал отображаемых элементов
  const currentRange = computed(() => {
    const startRange = scrollTop.value
    const endRange = scrollTop.value + (listHeight.value ?? 0)

    let startIndex = Math.floor(startRange / listItemHeight)
    let endIndex = Math.ceil(endRange / listItemHeight)

    startIndex = Math.max(0, startIndex - overscan)
    endIndex = Math.min(list.value.length, endIndex + overscan)

    return {
      startIndex,
      endIndex,
    }
  })

  const listToRender = computed(() =>
    list.value.slice(currentRange.value.startIndex, currentRange.value.endIndex + 1),
  )

  const totalListHeight = computed(() => list.value.length * listItemHeight)
  const offsetTopContainer = computed(() => currentRange.value.startIndex * listItemHeight)

  const containerProps: HTMLAttributes & ReservedProps & Record<string, unknown> = {
    style: { height: "100%", overflowY: "auto" },
  }

  const wrapperListProps = computed<HTMLAttributes>(() => {
    return {
      style: {
        marginTop: `${offsetTopContainer.value}px`,
        height: `${totalListHeight.value - scrollTop.value}px`,
      },
    }
  })

  onUnmounted(() => {
    templateRef.value?.removeEventListener("scroll", handleScroll)
    resizeObserver.value?.disconnect()
  })

  return {
    isScrolling,
    containerProps,
    wrapperListProps,
    listToRender,
  }
}
