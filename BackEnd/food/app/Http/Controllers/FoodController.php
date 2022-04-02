<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Food;
use App\Models\Profile;
use App\Models\Inbox;
use App\Models\User;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File; 

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $food = Food::all();

        return $food->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        if (Auth::check()) {
            return response()->json("hii");
        }
        // $id = Auth::user()->id;
        // $id = Auth::id();
        $food = new Food();
        $food->user_id = 2;
        $food->name = $request['name'];
        $food->type = $request['type'];
        $food->number = $request['number'];
        $food->ingredients = $request['ingredients'];
        $food->directions = $request['directions'];
        // $name = date('mdYHis') . uniqid() . $image;
        $image = $request->get('file');
        $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        Image::make($request->get('file'))->save(public_path('../../../FrontEnd/food/public/images/').$name);
        $food->image = $name;  
        $food->save();
        $inbox = new Inbox();
        $inbox->user_id = 2;
        $inbox->food_id = $food->id;
        $inbox->message = '';
        $inbox->save();
        return response()->json(['data' => $food, 'message' => 'Created successfully'], 201);
    }
    public function GetData()
    {
        $inbox = Inbox::all();
        
        return json_encode($inbox);
    }
    public function GetFood($id)
    {
        $food = Food::findOrFail($id);
        
        return json_encode($food);
    }
    public function GetUser($id)
    {
        $user = User::findOrFail($id);
        
        return json_encode($user);
    }
    public function GetInbox($id)
    {
        $inbox = Inbox::where('food_id', '=', $id )->firstOrFail();
        
        return json_encode($inbox);
    }
    public function UpdateInbox(Request $request,$id)
    {
        $inbox = Inbox::where('food_id', '=', $id )->firstOrFail();
        $inbox->message = $request['message'];
        $inbox->status = $request['status'];
        $inbox->save();
        return json_encode($inbox);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $food = Food::findOrFail($request['Id']);
        $food->user_id = 2;
        $food->name = $request['name'];
        $food->type = $request['type'];
        $food->number = $request['number'];
        $food->ingredients = $request['ingredients'];
        $food->directions = $request['directions'];
        // $name = date('mdYHis') . uniqid() . $image;
        $image = $request->get('file');
        $this->removeImage($food);
        if(strlen($image)>20){
            $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        Image::make($request->get('file'))->save(public_path('../../../FrontEnd/food/public/images/').$name);
        $food->image = $name; 
        }
         
        $food->save();

        $inbox = Inbox::where('food_id', '=', $food->id )->firstOrFail();
        $inbox->message = '';
        $inbox->status='pending';
        $inbox->save();
        return response()->json(['data' => $food, 'message' => 'Updated successfully'], 201);
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $food = Food::findOrFail($id);
        $this->removeImage($food);
        $food->delete();
        
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
    private function removeImage($food)
    {
        File::delete(public_path('../../../FrontEnd/food/public/images/'). $food->image);
    }
}
