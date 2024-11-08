function convertToMarkdown() {
    const jsonInput = document.getElementById('json-input').value;
    const markdownOutput = document.getElementById('markdown-output');

    try {
        const jsonObject = JSON.parse(jsonInput);
        const markdownText = jsonToMarkdown(jsonObject);
        markdownOutput.value = markdownText;
    } catch (error) {
        markdownOutput.value = '无效的JSON输入';
    }
}

function jsonToMarkdown(obj) {
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            return obj.map(jsonToMarkdown).join('\n\n');
        }

        return Object.entries(obj).map(([key, value]) => {
            const markdownKey = `**${key}**:`;
            const markdownValue = jsonToMarkdown(value);
            return `${markdownKey}\n\n${markdownValue}\n\n`;
        }).join('');
    } else {
        return String(obj);
    }
}


function jsonToNestedTables(json, parentIndent = '') {
    if (Array.isArray(json)) {
        return json.map((item, index) => {
            return `${parentIndent}| ${index} | ${jsonToNestedTables(item, '  ')} |\n`;
        }).join('');
    } else if (typeof json === 'object' && json !== null) {
        let rows = Object.entries(json).map(([key, value]) => {
            let valueTable = jsonToNestedTables(value, '  '); // 缩进以表示嵌套
            return `| ${key} |${valueTable ? ` ${valueTable}` : ` ${String(value)}`} |`;
        });  
        return `| ${rows.join(' |\n| ')} |\n`;
    } else {  
        return String(json);
    }
}


// 监听JSON输入框的输入事件
function convertToMarkdownTable() {
    const jsonInput = document.getElementById('json-input').value;
    const markdownOutput = document.getElementById('markdown-output');

    if (!jsonInput) {
        markdownOutput.value = '';
        return;
    }

    try {
        const jsonObject = JSON.parse(jsonInput);
        markdownOutput.value = jsonToNestedTables(jsonObject);
    } catch (error) {
        console.log(error);
        markdownOutput.value = '无效的JSON输入';
    }
}
