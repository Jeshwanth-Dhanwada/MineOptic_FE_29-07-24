export const groupLocByTipperId = (tipperData, key) => tipperData.reduce((itr, cur) => {
    if(itr.formattedResp[cur[key]]) itr.formattedResp[cur[key]].push({
         lat: cur.latitude,
         lng: cur.longitude,
         [key]: cur[key],
         trackTime: cur.trackTime,
         direction: cur.direction
    })
    else itr.formattedResp[cur[key]] = [{
        lat: cur.latitude,
         lng: cur.longitude,
         [key]: cur[key],
         trackTime: cur.trackTime,
         direction: cur.direction
    }]
    if(itr.coverage.x > cur.latitude) itr.coverage.x = cur.latitude;
    if(itr.coverage.y < cur.latitude) itr.coverage.y = cur.longitude;
    return itr;
}, {formattedResp: {}, coverage:{x:tipperData[0].latitude,y:0}})


export const getGroupedDates= (groupedData) => {
    return Object.values(groupedData).reduce((itr, cur) => {
        itr.push(...Object.values(cur.reduce((innerItr, innerCur) => {
            if(!innerItr[innerCur.trackTime]) innerItr[innerCur.trackTime] = innerCur
            return innerItr;
        }, {})))
        return itr
    }, [])
}