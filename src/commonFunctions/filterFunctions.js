export const getFilteredTrucks = () => {
    const availableTrippers = Object.keys(groupedTippers)
    if(availableTrippers.length) {
      // const prevTime = new Date(prevTimeref.current).getTime();
      let CurrentActiveTippers =[]
      const prevTippers = [...tippersMovement]
      for(let i=0; i<availableTrippers.length; i++) {
        const tipperKey = availableTrippers[i]
        const tippers = tipperData[tipperKey]
        const tipper = tippers.find(a =>  {
          const truckTime = new Date(a.trackTime).getTime()
          return truckTime <= renderedStreamDuration.getTime() &&  truckTime >=prevTime
        })
        if(tipper) CurrentActiveTippers.push(tipper)
        else {
          const existingTipper = prevTippers.find(a =>  a.tipper_id === tipperKey)
          if(existingTipper) CurrentActiveTippers.push(existingTipper);
        }
      }
    }
}