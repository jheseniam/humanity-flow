// Restricción: Uso estricto de getElementById (Punto 5)
const btnCalcular = document.getElementById("btnCalcular");

btnCalcular.addEventListener("click", function() {
    const fasesInput = document.getElementById("meses").value;
    const zonaResultado = document.getElementById("resultado");

    if (fasesInput === "" || fasesInput <= 0) {
        zonaResultado.innerHTML = `
            <div class="status-box" style="border-left-color: #ef4444; background: #fef2f2; color: #b91c1c;">
                <strong>[Alerta]</strong> Por favor, especifique una fase numérica válida para la proyección logístca.
            </div>`;
        return;
    }

    const cantidadFases = parseInt(fasesInput);

    // Algoritmo A: Sucesión de Fibonacci sin vectores/arrays (Punto 8.A)
    let anterior = 0;
    let actual = 1;
    let siguiente;
    let totalKitsDesplegados = 0;

    let estructuraTabla = `
        <table>
            <thead>
                <tr>
                    <th>Fase Operativa</th>
                    <th>Kits de Ayuda Entregados</th>
                    <th>Total Acumulado Enviado</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 1; i <= cantidadFases; i++) {
        let kitsFase = actual;
        totalKitsDesplegados += kitsFase;

        estructuraTabla += `
            <tr>
                <td><strong>Fase ${i}</strong></td>
                <td>${kitsFase.toLocaleString()} kits</td>
                <td>${totalKitsDesplegados.toLocaleString()} unidades</td>
            </tr>
        `;

        // Generación matemática pura de la sucesión
        siguiente = anterior + actual;
        anterior = actual;
        actual = siguiente;
    }

    estructuraTabla += `</tbody></table>`;

    // Algoritmo B: Verificación de Código de Seguridad Primo (Punto 8.B)
    let divisoresEncontrados = 0;
    for (let j = 1; j <= totalKitsDesplegados; j++) {
        if (totalKitsDesplegados % j === 0) {
            divisoresEncontrados++;
        }
    }

    const esNumeroPrimo = (divisoresEncontrados === 2);
    
    let mensajeLogistica = "";
    let claseEstilo = "status-box";

    if (esNumeroPrimo) {
        claseEstilo = "status-box success"; // Aplica color verde del CSS
        mensajeLogistica = `
            <strong>CÓDIGO DE ENVÍO SEGURO VERIFICADO:</strong> el total acumulado (${totalKitsDesplegados.toLocaleString()}) es un <strong>número primo</strong>. 
            El cargamento cumple con los protocolos criptográficos de trazabilidad e integridad.
        `;
    } else {
        mensajeLogistica = `
            <strong>CONTROL DE TRAZABILIDAD ESTÁNDAR:</strong> el volumen total de distribución (${totalKitsDesplegados.toLocaleString()}) es un número compuesto (posee ${divisoresEncontrados} divisores). 
            Se requiere añadir un sello de verificación manual.
        `;
    }

    // Impresión de resultados directamente en la vista (Punto 5)
    zonaResultado.innerHTML = `
        <h3 style="color: #0f172a; margin-bottom: 5px; font-family: 'Plus Jakarta Sans', sans-serif;">Reporte Logístico de Emergencia</h3>
        <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 15px;">Simulación de cobertura de suministros completada con éxito.</p>
        ${estructuraTabla}
        <div class="${claseEstilo}">
            ${mensajeLogistica}
        </div>
    `;
});