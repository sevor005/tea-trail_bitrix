<?
define("NO_KEEP_STATISTIC", true); // Не собираем стату по действиям AJAX
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

require_once(__DIR__ . '/../../bitrix/templates/tea_trail/dbg.php');

CModule::IncludeModule('iblock');
$СElement = new CIBlockElement;
$CEvent = new CEvent;

$request = json_decode(file_get_contents('php://input'), true);

$totalCost = 0;

$goodsListString = '<table width="100%">';
$goodsListString .= '<tr>';
$goodsListString .= '<th>Фото</th>';
$goodsListString .= '<th>ID</th>';
$goodsListString .= '<th>Название</th>';
$goodsListString .= '<th>Цена</th>';
$goodsListString .= '<th>Количество</th>';
$goodsListString .= '</tr>';

foreach ($request['goods'] as $goodsItem) {
  $totalCost += $goodsItem['price'] * $goodsItem['quantity'] / $goodsItem['pricePointValue'];

  $goodsListString .= '<tr>';
  $goodsListString .= '<td><img src="' . $goodsItem['image'] . '" width="80"/></td>';
  $goodsListString .= '<td>' . $goodsItem['id'] . '</td>';
  $goodsListString .= '<td>' . $goodsItem['name'] . '</td>';
  $goodsListString .= '<td>' . $goodsItem['price'] . ' руб./' . $goodsItem['pricePointCaption'] . '</td>';
  $goodsListString .= '<td>' . $goodsItem['quantity'] . ' ' . $goodsItem['pricePointCaption'] . '</td>';
  $goodsListString .= '</tr>';
}

$goodsListString .= '</table>';

$date = date('d.m.Y H:i');
$orderName = 'Заказ от ' . $date;

$addedElement = $СElement->Add(
  Array(
    'IBLOCK_ID' => 6,
    'NAME' => $orderName,
    'ACTIVE' => 'Y',
    'PREVIEW_TEXT' => $goodsListString,
    'PROPERTY_VALUES' => Array(
      'FIO' => $request['fio'],
      'EMAIL' => $request['email'],
      'PHONE' => $request['phone'],
      'REGION' => $request['region'],
      'CITY' => $request['city'],
      'INDEX' => $request['index'],
      'ADDRESS' => $request['address'],
      'DELIVERY' => $request['delivery'],
      'COST' => $totalCost,
      'STATUS' => 8,
    )
  )
);

if ($addedElement) {
  $CEvent->Send(
    'ORDER_ADD',
    's1',
    Array(
      'NAME' => $orderName,
      'FIO' => $request['fio'],
      'EMAIL' => $request['email'],
      'PHONE' => $request['phone'],
      'REGION' => $request['region'],
      'CITY' => $request['city'],
      'INDEX' => $request['index'],
      'ADDRESS' => $request['address'],
      'DELIVERY' => $request['delivery'],
      'COST' => $totalCost,
      'GOODS' => $goodsListString
    )
  );

  echo json_encode(Array(
    'status' => 'ok',
  ));
} else {
  echo json_encode(Array(
    'status' => 'error',
  ));
}
