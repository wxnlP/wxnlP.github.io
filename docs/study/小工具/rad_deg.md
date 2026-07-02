# 弧度与角度转换工具

<div style="background: var(--md-code-bg-color); padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 15px;">
        <label style="display: block; font-weight: bold; margin-bottom: 5px;">角度 (Degrees):</label>
        <input type="number" id="degreesInput" placeholder="输入角度，例如: 180" style="width: 100%; padding: 8px; border: 1px solid var(--md-typeset-color); border-radius: 4px; background: var(--md-fallback-bg-color); color: var(--md-typeset-color);">
    </div>

    <div style="margin-bottom: 15px; text-align: center;">
        <button class="md-button md-button--primary" onclick="convertDegToRad()">↓ 角度转弧度</button>
        <button class="md-button" onclick="convertRadToDeg()">↑ 弧度转角度</button>
    </div>
    
    <div>
        <label style="display: block; font-weight: bold; margin-bottom: 5px;">弧度 (Radians):</label>
        <input type="number" id="radiansInput" placeholder="输入弧度，例如: 3.14159" style="width: 100%; padding: 8px; border: 1px solid var(--md-typeset-color); border-radius: 4px; background: var(--md-fallback-bg-color); color: var(--md-typeset-color);">
    </div>
</div>

<script>
function convertDegToRad() {
    const deg = parseFloat(document.getElementById('degreesInput').value);
    if (!isNaN(deg)) {
        // 转换公式: rad = deg * (π / 180)
        const rad = deg * (Math.PI / 180);
        document.getElementById('radiansInput').value = rad.toFixed(6);
    }
}
function convertRadToDeg() {
    const rad = parseFloat(document.getElementById('radiansInput').value);
    if (!isNaN(rad)) {
        // 转换公式: deg = rad * (180 / π)
        const deg = rad * (180 / Math.PI);
        document.getElementById('degreesInput').value = deg.toFixed(6);
    }
}
</script>