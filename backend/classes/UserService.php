<?php

declare(strict_types=1);
include_once($_SERVER['DOCUMENT_ROOT'] . "/classes/Database.php");
include($_SERVER['DOCUMENT_ROOT'] . '/classes/utils.php');

class UserService
{
    private $mySQL;

    public function __construct()
    {
        $this->mySQL = new Database;
    }

    function getUser(int $id)
    {
        $q = "SELECT * FROM users WHERE id = '$id'";
        $res = $this->mySQL->query($q);
        $output = mysqli_fetch_assoc($res);

        return $output;
    }

    /**
     * @param float latitude The users latitude
     * @param float longtitude The users longtitude
     * @param float maxDistance The maximum distance between user & resturant allowed in results, - in kilometers
     */

    function getResturantList(
        float $latitude,
        float $longtitude,
        float $maxDistance,
        array $categories,
        string $searchString,
        string $sortBy,
    ) {

        // Query from: https://stackoverflow.com/questions/2234204/find-nearest-latitude-longitude-with-an-sql-query
        $q = "SELECT *,
        (
           6371 *
           acos(cos(radians($latitude)) *
           cos(radians(latitude)) *
           cos(radians(longtitude) -
           radians($longtitude)) +
           sin(radians($latitude)) *
           sin(radians(latitude )))
        ) AS distance
        FROM resturants
        HAVING distance < $maxDistance " .
            (!!strlen($searchString) ? "AND name LIKE '%$searchString%' " : "") .
            "ORDER BY $sortBy ASC;";
        $res = $this->mySQL->query($q);
        $output = [];

        if ($res) {
            while ($row = mysqli_fetch_assoc($res)) {
                $output[] = $row;
            }
        }

        return $output;
    }

    function getCategories()
    {
        $q = 'SELECT * FROM categories';
        $res = $this->mySQL->query($q);
        $categories = [];
        while ($row = mysqli_fetch_array($res)) {
            $categories[] = $row;
        }
        return $categories;
    }

    function getRestaurant($id){
        $q = "SELECT * FROM restaurants WHERE id = '$id'";
        $res = $this->mySQL->query($q);
        $output = mysqli_fetch_assoc($res);
        return $output;
    }
}
