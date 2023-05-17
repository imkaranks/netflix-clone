const staggerContent = {
  hide: {
    opacity: 1
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 5
    }
  }
}

const card = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 },
  },
  offscreen: {
    opacity: 0.25,
    x: -50,
    y: -50
  },
  onscreen: {
    opacity: 1,
    x: 0,
    y: 0
  }
}

const heading = {
  offscreen: {
    opacity: 0.5,
    x: '-50vh'
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring"
    }
  }
}

const button = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.9
  }
}

export { staggerContent, card, heading, button };