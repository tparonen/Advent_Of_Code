const SearchTree = require('./search-tree');
const BinarySearchTree = require('binary-search-tree').BinarySearchTree;

const ENTRY_SEPARATOR = ')';
const CENTER_OF_MASS = 'COM';

const tree = new SearchTree();

const parseOrbitMapEntry = (entry) => {
    return entry.split(ENTRY_SEPARATOR);
};

const feed = (orbitMapEntry) => {

    const [ parentId, childId ] = parseOrbitMapEntry(orbitMapEntry);

    tree.insert(parentId, childId);

};

const listParents = (nodeId) => {
    const parents = [];
    let parentId = tree.nodes[nodeId].parentId;
    parents.push(parentId);
    while (parentId !== CENTER_OF_MASS) {
        parentId = tree.nodes[parentId].parentId;
        parents.push(parentId);
    }
    return parents;
};

const calculateOrbitalTransfers = (parentsOne, parentsTwo) => {
    let totalOrbitalTransfersRequired = 0;
    const bst = new BinarySearchTree({ unique: true });
    parentsOne.forEach(parent => {
        bst.insert(parent, parent);
    });
    parentsTwo.forEach(parent => {
        const result = bst.search(parent);
        if (result.length === 0) {
            totalOrbitalTransfersRequired += 1;
        }
    });
    return totalOrbitalTransfersRequired;
};

const calculate = () => {
    const you = 'YOU';
    const santa = 'SAN';

    const myParents = listParents(you);
    const santasParents = listParents(santa);

    const transfersToCommonParentMe = calculateOrbitalTransfers(myParents, santasParents);
    const transfersToCommonParentSanta = calculateOrbitalTransfers(santasParents, myParents);

    return transfersToCommonParentMe + transfersToCommonParentSanta;
};

exports.feed = feed;
exports.calculate = calculate;