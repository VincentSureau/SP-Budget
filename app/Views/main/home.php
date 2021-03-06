
<?= $this->layout('base', ['myTitle' => 'Accueil']); ?>

<!-- content -->
<div class="container">
    <div class="z-depth-4 card-rounded">
        <h1 class="center-align">Mes dépenses par catégorie</h1>
        <div class="row">
            <form class="col s12 l8 offset-l2 xl6 offset-xl3 mb-0" action="<?= $router->generate("main_home") ?>">
                <div class="row mb-0">
                    <div class="input-field col s12 col m6">
                        <i class="material-icons prefix">date_range</i>
                        <input id="start" 
                            name="start" 
                            type="date" 
                            class="validate" 
                            value="<?= $startDate->format('Y-m-d')?>" 
                            onchange="this.form.submit();" 
                            required
                        >
                        <label for="start">Du</label>
                    </div>
                    <div class="input-field col s12 col m6">
                        <i class="material-icons prefix">date_range</i>
                        <input id="end" 
                            name="end" type="date" 
                            class="validate" 
                            value="<?= $endDate->format('Y-m-d')?>" 
                            onchange="this.form.submit();" 
                            required
                        >
                        <label for="end">Au</label>
                    </div>
                </div>
            </form>
        </div>

        <div class="row flex-row">

        <?php if(!empty($categories)): ?>
            <div class="col s12 l6 push-l6">
                <div class="chart-pie">
                    <canvas id="myPieChart"  width="350" height="350"></canvas>
                </div>
            </div>
            <div class="col s12 l6 pull-l6">
                <table class="striped highlight">
                    <thead>
                        <tr>
                            <th>Catégorie</th>
                            <th>Montant</th>
                        </tr>
                    </thead>

                    <tbody>
                        <?php foreach($categories as $category): ?>
                        <tr>
                            <td><?= $category->getName() ?></td>
                            <td class="right-align <?= $category->getAccountingTypeCoefficient() > 0 ? "green-text" : "red-text" ?>">
                                <?= $category->getTotalAmount() ?> &euro;
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th class="right-align <?= $operation->getTotalAmount() > 0 ? "green-text" : "red-text" ?>">
                                <?= $operation->getTotalAmount() ?> &euro;
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        <?php elseif($startDate > $endDate): ?>
            <p class="center-align">Les dates indiquées ne sont pas valides</p>
        <?php else: ?>
            <p class="center-align">Il n'y a aucune opération sur la période demandée</p>
        <?php endif; ?>
        </div>
    </div>

</div>
<script>
const labels =<?= json_encode(array_map(function($category){return $category->getName();}, $categories)); ?>;
const data =<?= json_encode(array_map(function($category){return $category->getTotalAmount();}, $categories)); ?>;
const colors =<?= json_encode(array_map(function($category){return "#" . str_pad(dechex(rand(0x000000, 0xFFFFFF)), 6, 0, STR_PAD_LEFT);}, $categories)); ?>;
</script>