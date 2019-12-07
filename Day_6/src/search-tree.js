class TreeNode {

    constructor(nodeId, parentId) {
        this.nodeId = nodeId;
        this.parentId = parentId;
    }

}

class SearchTree {

    constructor() {
        this.nodes = {};
    }

    insert(parentId, childId) {
        this.nodes[childId] = new TreeNode(childId, parentId);
    }

}

module.exports = SearchTree;