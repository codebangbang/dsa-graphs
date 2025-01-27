class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);

    return this;
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach((vertex) => this.addVertex(vertex));

    return this;
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);

    return this;
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);

    return this;
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    this.nodes.forEach((node) => node.adjacent.delete(vertex));

    return this;
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let visited = new Set();
    let result = [];

    function traverse(vertex) {
      if (!vertex) return null;

      visited.add(vertex);
      result.push(vertex.value);

      vertex.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }

    traverse(start);

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);

    while (toVisitQueue.length > 0) {
      let current = toVisitQueue.shift();
      current.adjacent.forEach((neighbor) => {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          toVisitQueue.push(neighbor);
        }
      });
    }

    return Array.from(seen).map((node) => node.value);
  }
}

module.exports = { Graph, Node };
