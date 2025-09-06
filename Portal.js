// This file will contain the JavaScript to render graphs for each algorithm card

document.addEventListener('DOMContentLoaded', function() {
    // Example graph data for each algorithm
    const graphs = {
        'Binary Search': {
            type: 'array',
            data: [1, 3, 5, 7, 9],
            target: 7
        },
        "Dijkstra's Algorithm": {
            type: 'graph',
            nodes: ['A', 'B', 'C', 'D'],
            edges: [
                { from: 'A', to: 'B', weight: 2 },
                { from: 'A', to: 'C', weight: 5 },
                { from: 'B', to: 'D', weight: 4 },
                { from: 'C', to: 'D', weight: 1 }
            ],
            path: ['A', 'B', 'D']
        },
        'Merge Sort': {
            type: 'array',
            data: [4, 2, 5, 1]
        },
        'Depth-First Search (DFS)': {
            type: 'tree',
            nodes: [
                { id: 1, label: 'Root', children: [
                    { id: 2, label: 'Left' },
                    { id: 3, label: 'Right' }
                ]}
            ]
        },
        'Quick Sort': {
            type: 'array',
            data: [3, 6, 2, 8],
            pivot: 3
        }
    };

    // Render a simple graph for each card
    document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('.card-title').textContent;
        const graphDiv = document.createElement('div');
        graphDiv.className = 'card-graph';
        graphDiv.style.marginTop = '10px';
        graphDiv.style.textAlign = 'center';
        graphDiv.style.minHeight = '60px';
        if (graphs[title]) {
            if (graphs[title].type === 'array') {
                // Draw array as boxes
                graphDiv.innerHTML = graphs[title].data.map(num => {
                    let highlight = (graphs[title].target && num === graphs[title].target) ? 'background:#ffe082;' : '';
                    let pivot = (graphs[title].pivot && num === graphs[title].pivot) ? 'border:2px solid #ff7043;' : '';
                    return `<span style="display:inline-block;width:32px;height:32px;line-height:32px;margin:2px;border-radius:4px;border:1px solid #bbb;${highlight}${pivot}">${num}</span>`;
                }).join(' ');
            } else if (graphs[title].type === 'graph') {
                // Draw simple graph (nodes and edges)
                let html = '<svg width="160" height="80">';
                const nodePos = { A: [30,40], B: [80,20], C: [80,60], D: [130,40] };
                graphs[title].edges.forEach(e => {
                    html += `<line x1="${nodePos[e.from][0]}" y1="${nodePos[e.from][1]}" x2="${nodePos[e.to][0]}" y2="${nodePos[e.to][1]}" stroke="#bbb" stroke-width="2" />`;
                    html += `<text x="${(nodePos[e.from][0]+nodePos[e.to][0])/2}" y="${(nodePos[e.from][1]+nodePos[e.to][1])/2-5}" font-size="10" fill="#888">${e.weight}</text>`;
                });
                graphs[title].nodes.forEach(n => {
                    let highlight = graphs[title].path && graphs[title].path.includes(n) ? '#4caf50' : '#1976d2';
                    html += `<circle cx="${nodePos[n][0]}" cy="${nodePos[n][1]}" r="14" fill="${highlight}" />`;
                    html += `<text x="${nodePos[n][0]}" y="${nodePos[n][1]+4}" text-anchor="middle" font-size="12" fill="#fff">${n}</text>`;
                });
                html += '</svg>';
                graphDiv.innerHTML = html;
            } else if (graphs[title].type === 'tree') {
                // Draw simple tree
                graphDiv.innerHTML = `<svg width="120" height="60">
                    <circle cx="60" cy="20" r="14" fill="#1976d2" />
                    <text x="60" y="25" text-anchor="middle" font-size="12" fill="#fff">Root</text>
                    <line x1="60" y1="34" x2="30" y2="50" stroke="#bbb" stroke-width="2" />
                    <line x1="60" y1="34" x2="90" y2="50" stroke="#bbb" stroke-width="2" />
                    <circle cx="30" cy="50" r="12" fill="#4caf50" />
                    <text x="30" y="55" text-anchor="middle" font-size="11" fill="#fff">L</text>
                    <circle cx="90" cy="50" r="12" fill="#4caf50" />
                    <text x="90" y="55" text-anchor="middle" font-size="11" fill="#fff">R</text>
                </svg>`;
            }
        }
        card.appendChild(graphDiv);
    });
});
