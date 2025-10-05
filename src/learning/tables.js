function draw(ctx, canvas, tables) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tables.forEach(table => {
        drawTable(ctx, table);
    });

    // relationships.forEach(rel => {
    //     drawRelationship(ctx, rel);
    // });
}

function drawTable(ctx, table) {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    // Outer rectangle
    ctx.fillRect(table.x, table.y, table.width, table.columns.length * 25 + 40);
    ctx.strokeRect(table.x, table.y, table.width, table.columns.length * 25 + 40);

    // Title
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText(table.id, table.x + 10, table.y + 20);

    //draw heading line
    console.log("x: "+table.x+", y:"+table.y);
    ctx.beginPath();
    ctx.moveTo(table.x, table.y+30);
    ctx.lineTo(table.x+table.width, table.y+30);
    ctx.stroke();


    // Columns
    ctx.font = "14px Arial";
    table.columns.forEach((col, i) => {
        ctx.fillText(col, table.x + 20, table.y + 50 + i * 25);
        if(i != table.columns.length-1){
            ctx.beginPath();
            ctx.moveTo(table.x, table.y + 60 + i * 25);
            ctx.lineTo(table.x+table.width, table.y + 60 + i * 25);
            ctx.stroke();
        }
    });
}

function drawRelationship(ctx, rel) {
    const fromTable = tables.find(t => t.id === rel.from.table);
    const toTable = tables.find(t => t.id === rel.to.table);

    if (!fromTable || !toTable) return;

    const startX = fromTable.x + fromTable.width;
    const startY = fromTable.y + 60; // approx row position
    const endX = toTable.x;
    const endY = toTable.y + 60;

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}