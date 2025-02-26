"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = exports.AVLTree = void 0;
// Узел дерева (readonly)
class Node {
    constructor(value, left = null, right = null, height = 1) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.height = height;
    }
}
exports.Node = Node;
// AVL-дерево
class AVLTree {
    constructor() {
        this.root = null;
    }
    // Получаем высоту узла (перенесено в AVLTree)
    getHeight(node) {
        return node ? node.height : 0;
    }
    // Получаем баланс-фактор узла
    getBalanceFactor(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
    // Правый поворот (создаём новый узел вместо изменения старого)
    rotateRight(y) {
        const x = y.left;
        return new Node(x.value, x.left, new Node(y.value, x.right, y.right, this.getHeight(y.right) + 1), Math.max(this.getHeight(x.left), this.getHeight(y.right)) + 1);
    }
    // Левый поворот (создаём новый узел вместо изменения старого)
    rotateLeft(x) {
        const y = x.right;
        return new Node(y.value, new Node(x.value, x.left, y.left, this.getHeight(x.left) + 1), y.right, Math.max(this.getHeight(y.right), this.getHeight(x.left)) + 1);
    }
    // Вставка элемента (рекурсивное создание новых узлов)
    insert(node, value) {
        if (!node)
            return new Node(value);
        let newNode;
        if (value < node.value) {
            newNode = new Node(node.value, this.insert(node.left, value), node.right);
        }
        else if (value > node.value) {
            newNode = new Node(node.value, node.left, this.insert(node.right, value));
        }
        else {
            return node;
        }
        const balance = this.getBalanceFactor(newNode);
        // LL Case
        if (balance > 1 && value < newNode.left.value)
            return this.rotateRight(newNode);
        // RR Case
        if (balance < -1 && value > newNode.right.value)
            return this.rotateLeft(newNode);
        // LR Case
        if (balance > 1 && value > newNode.left.value) {
            return this.rotateRight(new Node(newNode.value, this.rotateLeft(newNode.left), newNode.right));
        }
        // RL Case
        if (balance < -1 && value < newNode.right.value) {
            return this.rotateLeft(new Node(newNode.value, newNode.left, this.rotateRight(newNode.right)));
        }
        return newNode;
    }
    // Внешний метод для добавления элемента
    add(value) {
        this.root = this.insert(this.root, value);
    }
    // Поиск элемента в дереве
    search(node, value) {
        if (!node || node.value === value)
            return node;
        return value < node.value ? this.search(node.left, value) : this.search(node.right, value);
    }
    // Внешний метод для поиска
    find(value) {
        return this.search(this.root, value);
    }
}
exports.AVLTree = AVLTree;
