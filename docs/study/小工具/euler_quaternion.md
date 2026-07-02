# 3D 旋转与齐次矩阵转换工具

> **说明：** 本工具支持欧拉角、四元数、齐次变换矩阵（$4 \times 4$）的相互转换。输入的欧拉角单位为 **角度 (Degrees)**。齐次矩阵默认包含位移 (Translation) 信息。

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<div style="background: var(--md-code-bg-color); padding: 25px; border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

    <div style="display: flex; gap: 15px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed var(--md-typeset-color);">
        <div style="flex: 2;">
            <label style="display: block; font-weight: bold; margin-bottom: 8px;">旋转顺序 (Order):</label>
            <select id="eulerOrder" style="width: 100%; padding: 8px; border-radius: 4px; background: var(--md-fallback-bg-color); color: var(--md-typeset-color);" onchange="onOrderChange()">
                <option value="ZYX" selected>ZYX (Yaw-Pitch-Roll)</option>
                <option value="XYZ">XYZ (Unity/Unreal)</option>
                <option value="YXZ">YXZ</option>
                <option value="ZXY">ZXY</option>
                <option value="XZY">XZY</option>
                <option value="YZX">YZX</option>
            </select>
        </div>
        <div style="flex: 3; display: flex; gap: 5px;">
            <div style="flex: 1;">
                <label style="display: block; font-weight: bold; margin-bottom: 8px;">位置 X (Tx):</label>
                <input type="number" id="posX" value="0" step="any" style="width:100%; padding:8px; border-radius:4px; background: var(--md-fallback-bg-color); color: var(--md-typeset-color);">
            </div>
            <div style="flex: 1;">
                <label style="display: block; font-weight: bold; margin-bottom: 8px;">位置 Y (Ty):</label>
                <input type="number" id="posY" value="0" step="any" style="width:100%; padding:8px; border-radius:4px; background: var(--md-fallback-bg-color); color: var(--md-typeset-color);">
            </div>
            <div style="flex: 1;">
                <label style="display: block; font-weight: bold; margin-bottom: 8px;">位置 Z (Tz):</label>
                <input type="number" id="posZ" value="0" step="any" style="width:100%; padding:8px; border-radius:4px; background: var(--md-fallback-bg-color); color: var(--md-typeset-color);">
            </div>
        </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
        <div>
            <h3 style="margin-top: 0;">欧拉角 (Euler)</h3>
            <div style="margin-bottom: 8px;"><label id="labelX">X:</label> <input type="number" id="eulerX" value="0" step="any" style="width:100%; padding:6px; border-radius:4px;"></div>
            <div style="margin-bottom: 8px;"><label id="labelY">Y:</label> <input type="number" id="eulerY" value="0" step="any" style="width:100%; padding:6px; border-radius:4px;"></div>
            <div><label id="labelZ">Z:</label> <input type="number" id="eulerZ" value="0" step="any" style="width:100%; padding:6px; border-radius:4px;"></div>
        </div>
        <div>
            <h3 style="margin-top: 0;">四元数 (Quaternion)</h3>
            <div style="margin-bottom: 8px;"><label>X:</label> <input type="number" id="quatX" value="0" step="any" style="width:100%; padding:6px; border-radius:4px;"></div>
            <div style="margin-bottom: 8px;"><label>Y:</label> <input type="number" id="quatY" value="0" step="any" style="width:100%; padding:6px; border-radius:4px;"></div>
            <div style="margin-bottom: 8px;"><label>Z:</label> <input type="number" id="quatZ" value="0" step="any" style="width:100%; padding:6px; border-radius:4px;"></div>
            <div><label>W:</label> <input type="number" id="quatW" value="1" step="any" style="width:100%; padding:6px; border-radius:4px;"></div>
        </div>
    </div>
    
    <div style="text-align: center; margin-bottom: 25px; display: flex; justify-content: center; gap: 10px;">
        <button class="md-button md-button--primary" onclick="convertFromEulerOrQuat(true)">▲ 欧拉角 ➔ 更新所有</button>
        <button class="md-button md-button--primary" onclick="convertFromEulerOrQuat(false)">▲ 四元数 ➔ 更新所有</button>
        <button class="md-button" onclick="convertFromMatrix()">▼ 齐次矩阵 ➔ 更新所有</button>
    </div>
    
    <h3>齐次变换矩阵</h3>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: rgba(0,0,0,0.05); padding: 15px; border-radius: 6px;">
        <input type="number" id="m00" value="1" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m01" value="0" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m02" value="0" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m03" value="0" step="any" style="text-align:center; padding:6px; font-weight:bold; background:#e0f7fa;">
        <input type="number" id="m10" value="0" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m11" value="1" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m12" value="0" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m13" value="0" step="any" style="text-align:center; padding:6px; font-weight:bold; background:#e0f7fa;">
        <input type="number" id="m20" value="0" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m21" value="0" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m22" value="1" step="any" style="text-align:center; padding:6px;">
        <input type="number" id="m23" value="0" step="any" style="text-align:center; padding:6px; font-weight:bold; background:#e0f7fa;">
        <input type="number" id="m30" value="0" step="any" style="text-align:center; padding:6px;" disabled>
        <input type="number" id="m31" value="0" step="any" style="text-align:center; padding:6px;" disabled>
        <input type="number" id="m32" value="0" step="any" style="text-align:center; padding:6px;" disabled>
        <input type="number" id="m33" value="1" step="any" style="text-align:center; padding:6px;" disabled>
    </div>
</div>

<script>
function onOrderChange() {
    const order = document.getElementById('eulerOrder').value;
    document.getElementById('labelX').innerHTML = (order==='ZYX'||order==='XYZ') ? "X (Roll 翻滚):" : "X 轴旋转:";
    document.getElementById('labelY').innerHTML = (order==='ZYX'||order==='XYZ') ? "Y (Pitch 俯仰):" : "Y 轴旋转:";
    document.getElementById('labelZ').innerHTML = (order==='ZYX'||order==='XYZ') ? "Z (Yaw 偏航):" : "Z 轴旋转:";
}
onOrderChange();

// 辅助：获取位移向量
function getTranslation() {
    return new THREE.Vector3(
        parseFloat(document.getElementById('posX').value) || 0,
        parseFloat(document.getElementById('posY').value) || 0,
        parseFloat(document.getElementById('posZ').value) || 0
    );
}

// 辅助：将 Matrix4 填充到页面表格中
function updateMatrixUI(matrix) {
    const e = matrix.elements; // Three.js 矩阵是列主序的一维数组 (16个元素)
    // Row 0
    document.getElementById('m00').value = e[0].toFixed(6);
    document.getElementById('m01').value = e[4].toFixed(6);
    document.getElementById('m02').value = e[8].toFixed(6);
    document.getElementById('m03').value = e[12].toFixed(6); // Tx
    // Row 1
    document.getElementById('m10').value = e[1].toFixed(6);
    document.getElementById('m11').value = e[5].toFixed(6);
    document.getElementById('m12').value = e[9].toFixed(6);
    document.getElementById('m13').value = e[13].toFixed(6); // Ty
    // Row 2
    document.getElementById('m20').value = e[2].toFixed(6);
    document.getElementById('m21').value = e[6].toFixed(6);
    document.getElementById('m22').value = e[10].toFixed(6);
    document.getElementById('m23').value = e[14].toFixed(6); // Tz
}

// 算法：从欧拉角或四元数触发，同步更新所有的值
function convertFromEulerOrQuat(isEulerSource) {
    if (typeof THREE === 'undefined') return;
    const order = document.getElementById('eulerOrder').value;
    let quaternion = new THREE.Quaternion();
    let euler = new THREE.Euler();

    if (isEulerSource) {
        // 1. 欧拉角作为源
        const x = THREE.MathUtils.degToRad(parseFloat(document.getElementById('eulerX').value) || 0);
        const y = THREE.MathUtils.degToRad(parseFloat(document.getElementById('eulerY').value) || 0);
        const z = THREE.MathUtils.degToRad(parseFloat(document.getElementById('eulerZ').value) || 0);
        euler.set(x, y, z, order);
        quaternion.setFromEuler(euler);
        
        // 更新四元数 UI
        document.getElementById('quatX').value = quaternion.x.toFixed(6);
        document.getElementById('quatY').value = quaternion.y.toFixed(6);
        document.getElementById('quatZ').value = quaternion.z.toFixed(6);
        document.getElementById('quatW').value = quaternion.w.toFixed(6);
    } else {
        // 2. 四元数作为源
        const qx = parseFloat(document.getElementById('quatX').value) || 0;
        const qy = parseFloat(document.getElementById('quatY').value) || 0;
        const qz = parseFloat(document.getElementById('quatZ').value) || 0;
        const qw = parseFloat(document.getElementById('quatW').value) || 1;
        quaternion.set(qx, qy, qz, qw).normalize();
        euler.setFromQuaternion(quaternion, order);
    
        // 更新欧拉角 UI
        document.getElementById('eulerX').value = THREE.MathUtils.radToDeg(euler.x).toFixed(4);
        document.getElementById('eulerY').value = THREE.MathUtils.radToDeg(euler.y).toFixed(4);
        document.getElementById('eulerZ').value = THREE.MathUtils.radToDeg(euler.z).toFixed(4);
    }
    
    // 3. 生成并更新齐次矩阵
    const position = getTranslation();
    const scale = new THREE.Vector3(1, 1, 1); // 齐次变换通常不考虑缩放，默认为 1
    const matrix = new THREE.Matrix4().compose(position, quaternion, scale);
    updateMatrixUI(matrix);
}

// 算法：从矩阵输入框触发，反向更新欧拉角和四元数
function convertFromMatrix() {
    if (typeof THREE === 'undefined') return;
    const order = document.getElementById('eulerOrder').value;

    // 从页面读取 4x4 矩阵的值 (注意：Three.js 构造函数是行主序传入，内部转为列主序)
    const m00 = parseFloat(document.getElementById('m00').value) || 0;
    const m01 = parseFloat(document.getElementById('m01').value) || 0;
    const m02 = parseFloat(document.getElementById('m02').value) || 0;
    const m03 = parseFloat(document.getElementById('m03').value) || 0;
    
    const m10 = parseFloat(document.getElementById('m10').value) || 0;
    const m11 = parseFloat(document.getElementById('m11').value) || 0;
    const m12 = parseFloat(document.getElementById('m12').value) || 0;
    const m13 = parseFloat(document.getElementById('m13').value) || 0;
    
    const m20 = parseFloat(document.getElementById('m20').value) || 0;
    const m21 = parseFloat(document.getElementById('m21').value) || 0;
    const m22 = parseFloat(document.getElementById('m22').value) || 0;
    const m23 = parseFloat(document.getElementById('m23').value) || 0;
    
    const matrix = new THREE.Matrix4().set(
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        0,   0,   0,   1
    );
    
    // 1. 提取并同步位置 (Translation) 到上方输入框
    document.getElementById('posX').value = m03;
    document.getElementById('posY').value = m13;
    document.getElementById('posZ').value = m23;
    
    // 2. 从矩阵中提取四元数
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(matrix);
    document.getElementById('quatX').value = quaternion.x.toFixed(6);
    document.getElementById('quatY').value = quaternion.y.toFixed(6);
    document.getElementById('quatZ').value = quaternion.z.toFixed(6);
    document.getElementById('quatW').value = quaternion.w.toFixed(6);
    
    // 3. 从矩阵中提取欧拉角
    const euler = new THREE.Euler().setFromRotationMatrix(matrix, order);
    document.getElementById('eulerX').value = THREE.MathUtils.radToDeg(euler.x).toFixed(4);
    document.getElementById('eulerY').value = THREE.MathUtils.radToDeg(euler.y).toFixed(4);
    document.getElementById('eulerZ').value = THREE.MathUtils.radToDeg(euler.z).toFixed(4);
}
</script>