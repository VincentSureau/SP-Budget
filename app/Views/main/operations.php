
<?= $this->layout('base', ['myTitle' => 'Accueil']); ?>

<!-- content -->
<div class="container">
    <h1 class="center-align">Mes opérations</h1>
    <div class="row">
        <form class="col s12 l8 offset-l2 xl6 offset-xl3" action="<?= $router->generate("main_home") ?>">
            <div class="row">
                <div class="input-field col s6">
                    <input id="startDate" 
                        name="startDate" 
                        type="date" 
                        class="validate" 
                        value="<?= $startDate->format('Y-m-d')?>" 
                        onchange="this.form.submit();" 
                        required
                    >
                    <label for="startDate">Du</label>
                </div>
                <div class="input-field col s6">
                    <input id="endDate" 
                        name="endDate" type="date" 
                        class="validate" 
                        value="<?= $endDate->format('Y-m-d')?>" 
                        onchange="this.form.submit();" 
                        required
                    >
                    <label for="endDate">Au</label>
                </div>
            </div>
        </form>
    </div>

    <div class="row">

    <?php if(!empty($operations)): ?>
        <div class="col s12">
            <table class="striped highlight">
                <thead>
                    <tr>
                        <th>Catégorie</th>
                        <th>Date</th>
                        <th>Montant</th>
                    </tr>
                </thead>

                <tbody>
                    <?php foreach($operations as $operation): ?>
                    <tr>
                        <td><?= $operation->getCategory() ?></td>
                        <td><?= (\DateTime::createFromFormat('Y-m-d H:i:s',$operation->getDate()))->format('d/m/Y') ?></td>
                        <td class="<?= $operation->getAmount() > 0 ? "green-text" : "red-text" ?>">
                            <?= $operation->getAmount() ?> &euro;
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan=2>Total</th>
                        <th class="<?= $total > 0 ? "green-text" : "red-text" ?>">
                            <?= $total ?> &euro;
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
<script>
const labels =<?= json_encode(array_map(function($category){return $category->getName();}, $categories)); ?>;
const data =<?= json_encode(array_map(function($category){return $category->getTotalAmount();}, $categories)); ?>;
const colors =<?= json_encode(array_map(function($category){return "#" . str_pad(dechex(rand(0x000000, 0xFFFFFF)), 6, 0, STR_PAD_LEFT);}, $categories)); ?>;
</script>