import { tavily } from "@tavily/core"

const tvly = tavily({ apiKey: "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" })

const response = await tvly.search("whey protien")

console.log(response)