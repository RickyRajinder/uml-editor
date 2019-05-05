import Edge from "../graph/edge.js"

Edge.prototype.straightedge= function (startNode, endNode) {
    this.startNode = startNode
    this.endNode = endNode
    var slope = undefined
    var start = undefined
    var end = undefined
    return {
        contains: (x, y) => {
            let bounds = this.getBounds()
            let leftMost = bounds.x
            let rightMost = bounds.x + bounds.width
            let topMost = bounds.y
            let bottomMost = bounds.y + bounds.height
            return (x > leftMost && x < rightMost) &&
                (y > topMost && y < bottomMost)
        },
        draw: () => {
            //console.log("Drawing LabeledEdge.")
            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d')
            start = {x: startNode.getBounds().x, y: startNode.getBounds().y}
            end = {x: endNode.getBounds().x, y: endNode.getBounds().y}
            ctx.setLineDash([4, 16]);
            slope = (start.y - end.y)/(start.x - end.x) 
            //console.log(slope)
            ctx.moveTo(startNode.getBounds().x, startNode.getBounds().y)
            ctx.lineTo(endNode.getBounds().x, endNode.getBounds().y)
            ctx.stroke()
        },
        contains: p => {
            //console.log("Checking for contains")
            //console.log("Mouse is at: " + p.x + " " + p.y)
            var leniency = 10
            var multiplier = (p.x - start.x)
            var liney = start.y + (multiplier * slope)
            var linex = p.x
            //console.log("Line is at: " + linex + " " + liney)
            return (p.x > linex - leniency && p.x < linex + leniency) &&
            (p.y > liney - leniency && p.y < liney + leniency)
        },
        getBounds: () => {
            return {
                start: start,
                end: end,
                slope: slope
            }
        }
    }
}

export default Edge