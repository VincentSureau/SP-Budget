
<?= $this->layout('base', ['myTitle' => 'Accueil']); ?>

<!-- content -->
<div class="container">
    <h1 class="center-align">Mes opérations</h1>
    <div class="row">
        <form class="col s12 l8 offset-l2 xl6 offset-xl3" action="<?= $router->generate("main_operations") ?>">
            <input type="hidden" name="category" value="<?= $order['category'] ?>">
            <input type="hidden" name="amount" value="<?= $order['amount'] ?>">
            <input type="hidden" name="date" value="<?= $order['date'] ?>">
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
                        <th>
                            Catégorie
                            <a class="right grey-text <?= $order['category'] == 'DESC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?category=DESC&startDate=<?= $startDate->format('Y-m-d')?>&endDate=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_downward</i></a>
                            <a class="right grey-text <?= $order['category'] == 'ASC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?category=ASC&startDate=<?= $startDate->format('Y-m-d')?>&endDate=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_upward</i></a>
                        </th>
                        <th>
                            Date
                            <a class="right grey-text <?= $order['date'] == 'DESC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?date=DESC&startDate=<?= $startDate->format('Y-m-d')?>&endDate=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_downward</i></a>
                            <a class="right grey-text <?= $order['date'] == 'ASC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?date=ASC&startDate=<?= $startDate->format('Y-m-d')?>&endDate=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_upward</i></a>
                        </th>
                        <th>
                            <a class="right grey-text <?= $order['amount'] == 'DESC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?amount=DESC&startDate=<?= $startDate->format('Y-m-d')?>&endDate=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_downward</i></a>
                            <a class="right grey-text <?= $order['amount'] == 'ASC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?amount=ASC&startDate=<?= $startDate->format('Y-m-d')?>&endDate=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_upward</i></a>
                            Montant
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <?php foreach($operations as $operation): ?>
                    <tr>
                        <td><?= $operation->getCategory() ?></td>
                        <td class="center-align"><?= (\DateTime::createFromFormat('Y-m-d H:i:s',$operation->getDate()))->format('d/m/Y') ?></td>
                        <td class="right-align <?= $operation->getAmount() > 0 ? "green-text" : "red-text" ?>">
                            <?= $operation->getAmount() ?> &euro;
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan=2>Total</th>
                        <th class="right-align <?= $total > 0 ? "green-text" : "red-text" ?>">
                            <?= $total ?> &euro;
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="row center-align">
            <ul class="pagination">
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                <li class="active"><a href="#!">1</a></li>
                <li class="waves-effect"><a href="#!">2</a></li>
                <li class="waves-effect"><a href="#!">3</a></li>
                <li class="waves-effect"><a href="#!">4</a></li>
                <li class="waves-effect"><a href="#!">5</a></li>
                <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            </ul>
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