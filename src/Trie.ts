export class Trie {
    root: TrieNode
    size = 0

    constructor() {
        this.root = new TrieNode()
    }
    public addWord(s: string) {
        let curr = this.root

        for (const char of s) {
            if (!curr.children[char.toLowerCase().charCodeAt(0)]) {
                curr.children[char.toLowerCase().charCodeAt(0)] = new TrieNode()
            }
            curr = curr.children[char.toLowerCase().charCodeAt(0)]
        }
        curr.isEndofWord = true
        this.size++
    }

    public findWordIfExists(s: string) {
        let curr = this.root

        for (const char of s) {
            if (!curr.children[char.toLowerCase().charCodeAt(0)]) {
                curr.children[char.toLowerCase().charCodeAt(0)] = new TrieNode()
            }
            curr = curr.children[char.toLowerCase().charCodeAt(0)]
        }
        return curr.isEndofWord
    }

    public getWordsInAlphaOrder() {
        let curr = this.root;

        const listWords: Array<string> = []

        const helper = (wordList: Array<string>, node: TrieNode) => {
            if (!node) return
            let curr = node
            for (let i = 0; i < curr.children.length; i++) {
                if (!node) {
                    continue
                }
                wordList.push(String.fromCharCode(i))
                if (curr.isEndofWord) {
                    listWords.push(wordList.join(""))
                    helper(wordList, node)
                }
            }
        }

        helper([], this.root)

        return listWords
    }
}

class TrieNode {
    public children: Array<TrieNode> = []
    public isEndofWord: boolean = false

    constructor() {

    }
}