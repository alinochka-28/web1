<?php
// Функция, определяющая попадание точки в заданную область
function isPointInArea($x, $y, $r)
{
    // Проверка прямоугольной области (теперь в нижней левой части)
    if ($x >= -$r && $x <= 0 && $y >= -$r / 2 && $y <= 0) {
        return true;
    }

    // Проверка треугольной области (теперь в нижней правой части)
    if ($x >= 0 && $y <= 0 && $y >= $x/2-$r/2 && $x <= $r) {
        return true;
    }

    // Проверка круговой области
    if ($x <= 0 && $y >= 0 && sqrt($x * $x + $y * $y) <= $r / 2) {
        return true;
    }

    // Если ни одно из условий не выполняется, точка не принадлежит ни одной области
    return false;
}

// Получение данных из GET-запроса
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $initial_time = microtime(true);
    $x = isset($_GET['x']) ? floatval($_GET["x"]) : null;
    $y = isset($_GET["y"]) ? floatval($_GET["y"]) : null;
    $r = isset($_GET["r"]) ? floatval($_GET["r"]) : null;

    $executionTime = $initial_time - $_SERVER['REQUEST_TIME'];

    // Проверка наличия всех необходимых данных
    if ($x !== null && $y !== null && $r !== null) {
        // Проверка попадания точки в область
        $isInArea = isPointInArea($x, $y, $r);

        // Формирование ответа
        $result = ['x' => $x ,'y' => $y,'r' => $r,'isInArea' => $isInArea, 'extime' =>  $executionTime];
        echo json_encode($result);
    } else {
        // Если не все данные предоставлены, возвращаем ошибку
        header("HTTP/1.1 400 Bad Request");
        echo "Не все данные переданы.";
    }
} else {
    // Если запрос не является GET-запросом, возвращаем ошибку
    header("HTTP/1.1 405 Method Not Allowed");
    echo "Метод не поддерживается.";
}
$data= array('x' => $x ,'y' => $y,'r' => $r,'collision' => $answer, 'exectime' => $executionTime); 
?>

