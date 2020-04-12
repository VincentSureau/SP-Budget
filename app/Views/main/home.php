
<?= $this->layout('base', ['myTitle' => 'Accueil']); ?>

<!-- content -->
<div class="container">
    <h1>Bienvenue sur AppBudget</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur recusandae, vitae accusamus itaque numquam cupiditate, magnam aliquam velit suscipit, nihil fugit voluptates similique fugiat. Eius beatae, distinctio inventore obcaecati mollitia voluptates eum harum tempora eligendi perferendis iste, adipisci ipsa. Officiis sed nesciunt minus sunt animi saepe voluptas harum fugiat numquam?</p>

    <div class="row">
        <div class="col l6">
            <table>
                <thead>
                    <tr>
                        <th>Catégorie</th>
                        <th>Montant</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th>Impôt</th>
                        <td>100 €</td>
                    </tr>
                    <tr>
                        <th>Impôt</th>
                        <td>100 €</td>
                    </tr>
                    <tr>
                        <th>Impôt</th>
                        <td>100 €</td>
                    </tr>
                    <tr>
                        <th>Impôt</th>
                        <td>100 €</td>
                    </tr>
                    <tr>
                        <th>Impôt</th>
                        <td>100 €</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>200€</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="col l6">
            <div class="chart-pie">
                <canvas id="myPieChart"  width="350" height="350"></canvas>
            </div>
        </div>
    </div>

</div>