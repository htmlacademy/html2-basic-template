import chalk from "chalk"

let chanks = {
	"more": "├",
	"gap": "│  ",
	"last": "└",
	"label": "─ "
}

export function generateAnciiTree (ast, options) {
	let isRoot = !options
	if (!options) {
		options = {}
	}

	if (!options.prefix) {
		options.prefix = []
	}

	let color = ast.color ? chalk[ast.color] : null, row = []

	if (color instanceof Function) {
		ast.label = color(ast.label || "")
	}

	ast.label = options.prefix.join("") + (chanks[options.chank] ? chanks[options.chank] + chanks["label"] : "") + ast.label

	row.push(ast.label)

	if (ast.nodes) {
		if (!isRoot) {
			if (options.chank === "last") {
				options.prefix.push("   ")
			} else {
				options.prefix.push(chanks["gap"])
			}
		}
		for (let i = 0; i < ast.nodes.length; i++) {
			options.chank = i === ast.nodes.length - 1 ? "last" : "more"
			row.push(generateAnciiTree(ast.nodes[i], options))
			options.prefix.pop()
		}
	}

	return row.join("\n")
}
