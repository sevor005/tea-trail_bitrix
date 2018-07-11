<?
function goods_list($section) {
  $goodsPagesCount = ceil(count($section['GOODS']) / 6);
  $itemNumber = 0;
?>
  <?foreach($section['GOODS'] as $goods):?>
    <?if ($itemNumber % 6 == 0):?>
      <div class="goods-page<?if ($itemNumber == 0):?> goods-page_active<?endif;?>">
    <?endif;?>

    <?
    $link = $section['CODE'] .'/' . $goods['CODE'];
    if ($section['CODE'] != 'dishes') {
      $link = 'tea/' . $link;
    }
    ?>

    <a
      href="#<?= $link?>"
      class="goods js-goods"
      data-id="<?= $goods['ID']?>"
      data-name="<?= $goods['NAME']?>"
      data-link="<?= $link?>"
      data-preview-text="<?= $goods['PREVIEW_TEXT']?>"
      data-image="<?= $goods['DETAIL_PICTURE']?>"
      data-price="<?= $goods['PROPERTY_PRICE_VALUE']?>"
      data-price-point="<?= $goods['PROPERTY_PRICE_POINT_VALUE']?>"
    >
      <div class="goods__container">
        <div class="goods__circle" style="background-image: url(<?= $goods['DETAIL_PICTURE']?>);"></div>

        <div class="goods__info">
          <div class="goods__title"><?= $goods['NAME']?></div>

          <div class="goods__cost"><?= $goods['PROPERTY_PRICE_VALUE']?> р</div>
        </div>
      </div>

      <div class="goods__detail-text"><?= $goods['DETAIL_TEXT']?></div>
    </a>

    <?$itemNumber++;?>

    <?if ($itemNumber % 6 == 0 || ($itemNumber + 1) > count($section['GOODS'])):?>
      </div>
    <?endif;?>
  <?endforeach;?>

  <?if (count($section['GOODS']) > 6):?>
    <div class="switch-goods">
      <div class="switch-goods__toggle switch-goods__toggle_left"></div>

      <?for($page = 0; $page < $goodsPagesCount; $page++):?>
        <div class="switch-goods__circle<?if ($page == 0):?> switch-goods__circle_active<?endif;?>"></div>
      <?endfor;?>

      <div class="switch-goods__toggle switch-goods__toggle_right"></div>
    </div>
  <?endif;?>
<?}
